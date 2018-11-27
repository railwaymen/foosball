# frozen_string_literal: true

require 'application_responder'

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :restrict_access
  self.responder = ApplicationResponder
  respond_to :json

  private

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      ApiKeyService.new(access_token: token, client_id: options['client_id']).access?
    end
  end
end
