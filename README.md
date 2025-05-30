Invisible Warriors: AI-Powered Decentralized Identity for Soldiers
Team Name: Sound Craze
Team Members: Sachin Sharma (Team Leader), Harsh Kumar, Ayush Uttam
Institute: Axis Institute of Technology and Management
GitHub Repository: Army_for_me

📌 Overview
Invisible Warriors is an innovative solution aimed at revolutionizing soldier identification by leveraging AI and blockchain technologies. The project addresses the critical issue of identity loss in combat zones by providing a secure, immutable, and decentralized identity system that functions effectively even in hostile and disconnected environments.

🧠 Problem Statement
In combat situations, soldiers often lose access to their identity due to destroyed documents, separation from units, or covert missions. Traditional identification methods are unreliable, and centralized databases are prone to failure and cyberattacks. This can lead to delays in medical treatment and rescue efforts, putting soldiers' lives at risk.

🚀 Proposed Solution
Our solution introduces an AI-powered decentralized identity system with the following key features:

Decentralized Security: Eliminates single points of failure, ensuring tamper-proof records and resilience against cyberattacks.

Offline-Ready Biometric Verification: Utilizes edge computing for instant biometric verification (face and voice) without network connectivity.

Persistent & Immutable Identity Records: Stores soldier identities on a blockchain, creating permanent records that are easily verifiable.

Real-Time Integration: Seamlessly integrates with military infrastructure for real-time identity verification and access control.

AI-Powered Fraud Prevention: Employs AI-driven biometric authentication to reduce the risk of fraud or impersonation.

Data Privacy: Empowers soldiers with control over their personal identity data, granting access only when necessary.

🏗️ System Architecture
The system comprises the following components:

Frontend: Built with Next.js, utilizing shadcn/ui and Tailwind CSS for UI components. Incorporates face-api.js for face detection and the Web Speech API for voice capture.

Backend: Developed using Django REST Framework, with JWT authentication and custom permissions for different user roles. Asynchronous tasks are managed with Celery and Redis.

Blockchain: Utilizes Hyperledger Fabric for a permissioned blockchain network, ensuring secure and immutable identity records.

AI/ML: Implements facial recognition using FaceNet or ArcFace models and voiceprint recognition with pre-trained speaker-verification models.

Storage & Caching: Employs AWS S3 or MinIO for storing raw uploads and Redis for session data and biometric matching cache.

Security & Key Management: Ensures data protection with AES-256 encryption, TLS certificates, and key management using AWS KMS or HashiCorp Vault.

DevOps & Infrastructure: Containerized with Docker Compose for the prototype and Kubernetes for production. CI/CD pipelines are managed with GitHub Actions.

🛠️ Tech Stack
Frontend: Next.js, shadcn/ui, Tailwind CSS, face-api.js, Web Speech API

Backend: Django REST Framework, Celery, Redis, JWT

Blockchain: Hyperledger Fabric

AI/ML: FaceNet/ArcFace, pyannote.audio, resemblyzer

Storage: AWS S3/MinIO, Redis

Security: AES-256, TLS, AWS KMS/HashiCorp Vault

DevOps: Docker Compose, Kubernetes, GitHub Actions

🔧 Prototype Setup
To run the prototype locally:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/SACHU11223/Army_for_me.git
cd Army_for_me
Start the services using Docker Compose:

bash
Copy
Edit
docker-compose up --build
Access the application:

Enrollment Page: http://localhost:3000/enrol

Verification Page: http://localhost:3000/verify

📈 Impact
Enhanced Soldier Safety: Quick and accurate identification enables faster rescue and medical response.

Improved Operational Efficiency: Streamlined identity verification reduces delays and enhances security during missions.

Reduced Identity Fraud: Blockchain-based immutability prevents tampering and unauthorized access.

Lower Administrative Costs: Eliminates the need to replace lost or stolen IDs.

Regulatory Compliance: Designed to meet Department of Defense data security standards.

📄 License
This project is licensed under the MIT License.

