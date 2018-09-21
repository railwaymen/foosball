class ApiKey < ApplicationRecord
  before_create :generate_client_id
  before_create :generate_client_secret

  private

  def generate_client_id
    begin
      self.client_id = SecureRandom.hex
    end while self.class.exists?(client_id: client_id)
  end

  def generate_client_secret
    begin
      self.client_secret = SecureRandom.hex
    end while self.class.exists?(client_secret: client_secret)
  end
end
