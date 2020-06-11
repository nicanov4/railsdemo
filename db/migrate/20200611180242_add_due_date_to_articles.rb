class AddDueDateToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :due_date, :datetime
  end
end
