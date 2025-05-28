import numpy as np
import uuid

def generate_face_embedding(image_data):
    dummy_vector = np.random.rand(128).tolist()
    return dummy_vector, f"soldier-0x{uuid.uuid4().hex[:8]}"
