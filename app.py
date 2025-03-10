from flask import Flask, jsonify
from pymongo import MongoClient
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb+srv://devigget:fz2N9FRbeRs8vyke@healthnet.yhvd5iy.mongodb.net/KickZone")
db = client["MindLancer"]

# Load SentenceTransformer model
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_recommendations():
    """Fetch data, compute similarities, and generate recommendations."""
    # Fetch freelancer data
    freelancers = list(db["freelancers_data"].find({}, {"_id": 0}))
    freelancer_df = pd.DataFrame(freelancers)

    # Fetch project data
    projects = list(db["projects_data"].find({}, {"_id": 0}))
    project_df = pd.DataFrame(projects)

    if freelancer_df.empty or project_df.empty:
        return {"error": "No freelancers or projects found"}

    # Convert freelancer details to text format
    freelancer_texts = freelancer_df.apply(lambda x:
        f"Skills: {', '.join(x['skills'])}. "
        f"Experience: {x['experience']} years. "
        f"Pay: {x['pay_range']}.", axis=1)

    # Convert project details to text format
    project_texts = project_df.apply(lambda x:
        f"Requirements: {', '.join(x['requirements'])}. "
        f"Minimum Experience: {x['min_experience']} years. "
        f"Budget: {x['budget']}.", axis=1)

    # Generate embeddings
    freelancer_embeddings = model.encode(freelancer_texts.values.tolist(), normalize_embeddings=True)
    project_embeddings = model.encode(project_texts.values.tolist(), normalize_embeddings=True)

    # Compute cosine similarity
    similarity_matrix = cosine_similarity(freelancer_embeddings, project_embeddings)

    # Get top matches
    top_matches = np.argsort(-similarity_matrix, axis=1)

    # Prepare JSON response
    recommendations = []
    for i in range(len(freelancer_df)):
        recommended_projects = []
        for j in top_matches[i][:3]:  # Top 3 project recommendations
            recommended_projects.append({
                "client": project_df.iloc[j]['client'],
                "requirements": project_df.iloc[j]['requirements'],
                "min_experience": int(project_df.iloc[j]['min_experience']),
                "budget": str(project_df.iloc[j]['budget'])
            })
        recommendations.append({
            "freelancer": freelancer_df.iloc[i]['name'],
            "skills": freelancer_df.iloc[i]['skills'],
            "top_projects": recommended_projects
        })

    return recommendations


@app.route('/recommendations', methods=['GET'])
def recommendations():
    """API endpoint to get freelancer-project recommendations."""
    return jsonify(get_recommendations())


if __name__ == '__main__':
    app.run(debug=True)
