# Backend Code of Soilit!
This repository consists of REST API codes using NodeJS to make a connection between mobile, Cloud Firestore, and Cloud Storage (bucket). We build the API's container with Cloud Build and deploy it with Cloud Run. 

## Installation
1. Clone the respository: `git clone https://github.com/SoilIt/Backend-Application`
2. Open the project with Visual Studio Code
3. Run the application with `node index.js` or `npx nodemon index.js` command from command line interface

## Firestore Emulator
We use Firestore emulator to connect app from local to Firestore. Use two command line interface to run the app and the emulator!

1. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
2. Update gcloud CLI installation to get the latest features: `gcloud components update` or the CLI will install the emulator automatically if you insert the emulator command
3. Run the following command to start the emulator: `gcloud emulators firestore start` or `gcloud emulators firestore start --host-port=HOST:PORT` for spesific host and port
4. Type CTRL + C to stop the emulator

Check this out for more information about the emulator: https://cloud.google.com/firestore/docs/emulator

## Build and Deploy
1. Use the `./deploy.sh` command to automatically build and deploy the API or
2. Insert the two command in deploy.sh file to manually build and deploy the API and change the project ID to your project ID in Google Cloud
   
Check this out for more references:
1. Cloud Build command: https://cloud.google.com/sdk/gcloud/reference/builds/submit
2. Cloud Run command: https://cloud.google.com/sdk/gcloud/reference/run
----------------------------------------
In case you want to know how we connect to Firestore, check out [this video](https://www.youtube.com/watch?v=M53VqNtioxE)!
