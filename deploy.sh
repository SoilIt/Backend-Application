GOOGLE_PROJECT_ID=soilit

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/soilitapi \
  --project=$GOOGLE_PROJECT_ID

gcloud beta run deploy soilit-api \
  --image gcr.io/$GOOGLE_PROJECT_ID/soilitapi \
  --platform managed \
  --region asia-southeast2 \
  --project=$GOOGLE_PROJECT_ID