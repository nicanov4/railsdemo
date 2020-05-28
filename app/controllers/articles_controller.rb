class ArticlesController < ApplicationController

  before_action :find_all_articles, only: [:index]
  before_action :find_article_by_id, only: [:show, :edit, :update, :destroy]
  before_action :make_new_article, only: [:new]
  before_action :find_new_article, only: [:create]
   
  def index
  end

  def show
  end
  
  def new
  end

  def edit
  end
  
  def create
    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def update
    if @article.update(article_params)
      redirect_to @article
    else
      render 'edit'
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_path
  end
  
  private
  def article_params
    params.require(:article).permit(:title, :text)
  end

  def find_all_articles
    @articles = Article.all
  end

  def find_article_by_id
    @article = Article.find(params[:id])
  end

  def make_new_article
    @article = Article.new
  end
  
  def find_new_article
    @article = Article.new(article_params)
  end
end
