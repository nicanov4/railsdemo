class Api::ArticlesController < ApplicationController

  respond_to :json
  before_action :find_article_by_id, only: [:show, :edit, :update, :destroy]

  def index
    respond_with Article.all
  end

  def show
    respond_with @article
  end
  
  def edit
  end
  
  def create
    respond_with :api, Article.create(article_params)
  end

  def update
    @article.update(article_params)
    respond_with Article, json: @article
  end

  def destroy
    respond_with @article.destroy
  end
  
  private
  def article_params
    params.require(:article).permit(:title, :text, :due_date, :status)
  end

  def find_article_by_id
    @article = Article.find(params[:id])
  end
  
end
