# Patients Chatbot

This project is an attempt to reduce the administrative burden of general practitioners who needs to constantly feedback to their patients the results of various medical checks but is suitable for various other similar cases with only small modifications.
The chat bot assumes following woking process:
1. The patient visits his GP for routine checks.
2. The GP performes all neccessary procedures but some procedures takes time e.g. blood test.
3. The patient receives a password key with which he/she can ask the chatbot for the result on the next day.

Solution Architecture:
1. Google Sheet is used as a database for the patients. Doctors are putting the information for the patient there. Thanks to Google flexible sharing options, it is possible to defne proper read/write rights for all participants in the process
2. The chat bot is asks the patient for EGN and password key.
3. With this two parameters the chatbot is quering the Google sheet to get the data for the patient
4. Web Action is used as an intermediate actor between the Google sheet and the chat bot for accomodating the interface requirements on both sides.

Installation:
1. Clone the repo -> git clone ....
2. install dependancies -> npm install
3. (optional) you can test locally with --> node index.js
4. prepare deployment package --> npx webpack --config webpack.config.js  
5. Create new namespace for web actions through IBM Cloud console with name "PatientsChatbot"
6. make it active --> ibmcloud fn property set --namespace PatientsChatbot
7. upload the package. Replace <mysecret> with your password --> ibmcloud fn action update getExamResults dist\bundle.js --kind nodejs:10 --web true --web-secure true --require-whisk-auth <mysecret>
8. Create Google Service Credentials and download the JSON fine with the credentials.
8. Create chatbot
