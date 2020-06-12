json.(@article, :title, :text, :created_at, :updated_at, :due_date, :status, :author)

json.comments @article.comments, :body, :user_id
