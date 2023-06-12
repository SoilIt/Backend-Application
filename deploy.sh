GOOGLE_PROJECT_ID=soilit

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/backend-api \
  --project=$GOOGLE_PROJECT_ID

gcloud beta run deploy backend-api \
  --image gcr.io/$GOOGLE_PROJECT_ID/backend-api \
  --platform managed \
  --region asia-southeast2 \
  --project=$GOOGLE_PROJECT_ID
