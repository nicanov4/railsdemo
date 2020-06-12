namespace :due_date_reminder do
  desc "Rake task to send email"
  task sendMail: :environment do
    @articles = Article.all
    @articles.each do |article|
      if (article.status == 'Draft') && ((article.due_date-Time.now)<604800)
        user = User.find(article.user_id)
        ArticleMailer.with(user: user, article: article).due_date_email.deliver_now
      end
    end
  end
end
