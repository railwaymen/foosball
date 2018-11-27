# frozen_string_literal: true

class ApiKeyService
  def initialize(access_token:, client_id:)
    @access_token = access_token
    @client_id = client_id
  end

  def access?
    return false if api_key.blank?

    begin
      JWT.decode @access_token, api_key.client_secret, true, algorithm: 'HS256'
      return true
    rescue JWT::ExpiredSignature
      return false
    end
  end

  private

  def api_key
    @api_key ||= ApiKey.find_by(client_id: @client_id)
  end
end
