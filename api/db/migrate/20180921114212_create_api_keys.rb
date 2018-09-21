class CreateApiKeys < ActiveRecord::Migration[5.2]
  def change
    create_table :api_keys do |t|
      t.string :client_id, null: false
      t.string :client_secret, null: false

      t.timestamps
    end
  end
end
