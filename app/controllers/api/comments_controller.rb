class Api::CommentsController < ApplicationController

  respond_to :json 
  before_action :find_article_by_id
  
  def index
    @comments = @article.comments
    respond_with @comments
  end
    
  def create
    @comment = @article.comments.new(comment_params)
    @comment.commenter = current_user.email
    @comment.user_id = current_user.id
    @comment.save
    render 'show.json.jbuilder'
    
  end

  def destroy
    @comment = @article.comments.find(params[:id])
    respond_with @comment.destroy
    
  end
  
  private
  def comment_params
    params.require(:comment).permit(:body, :isPrivate, :article_id, :user_id)
  end

  def find_article_by_id
    @article = Article.find(params[:article_id])
  end
end
