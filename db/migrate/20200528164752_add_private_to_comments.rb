class AddPrivateToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :private, :string
  end
end
