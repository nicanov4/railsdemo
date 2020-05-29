json.(@article, :title, :text, :created_at, :updated_at)

json.comments @article.comments, :body, :user_id
