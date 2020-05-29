class Api::CommentsController < ApplicationController

  respond_to :json
  
  before_action :find_article_by_id
  before_action :authenticate_user!
  
  def create
    @comment = @article.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save
    respond_with @comment
    
  end

  def destroy
    @comment = @article.comments.find(params[:id])
    respond_with @comment.destroy
    
  end
  
  private
  def comment_params
    params.require(:comment).permit(:body, :isPrivate)
  end

  def find_article_by_id
    @article = Article.find(params[:article_id])
  end
end
