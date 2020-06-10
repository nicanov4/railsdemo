class Api::CommentsController < ApplicationController

  respond_to :json
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:create, :destroy] 
  before_action :find_article_by_id
  
  def index
    @comments = @article.comments
    respond_with @comments
  end
    
  def create
    @comment = @article.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save
    respond_with @article
    
  end

  def destroy
    @comment = @article.comments.find(params[:id])
    respond_with @articles
    
  end
  
  private
  def comment_params
    params.require(:comment).permit(:body, :isPrivate)
  end

  def find_article_by_id
    @article = Article.find(params[:article_id])
  end
end
