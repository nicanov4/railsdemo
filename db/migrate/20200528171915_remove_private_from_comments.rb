class RemovePrivateFromComments < ActiveRecord::Migration[6.0]
  def change
    remove_column :comments, :private, :boolean
  end
end
