class CommentsController < ApplicationController

  before_action :find_article_by_id
  before_action :authenticate_user!
  
  def create
    @comment = @article.comments.create(comment_params)
    @comment.update(:commenter => current_user.email)
    redirect_to article_path(@article)
  end

  def destroy
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to article_path(@article)
  end
  
  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_article_by_id
    @article = Article.find(params[:article_id])
  end
end
