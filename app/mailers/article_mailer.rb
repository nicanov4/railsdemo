class ArticleMailer < ApplicationMailer
  default from: 'blog@example.com'

  def due_date_email
    @user = params[:user]
    @article = params[:article]
    mail(to: @user.email, subject: 'Article due date within 1 week!')
  end
end
