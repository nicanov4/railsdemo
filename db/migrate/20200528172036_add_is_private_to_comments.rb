class AddIsPrivateToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :isPrivate, :boolean
  end
end
