class ImagesController < ApplicationController
  
  include SessionsHelper
  
  require 'json'
  
  session :cookie_only => false, :only => :create
  skip_before_filter :verify_authenticity_token
  
  def create
    user_id = get_user_id_by_sessid(params[:images_session])
    if params[:file] && user_id
      image = Image.new(:image => params[:file], :user_id => user_id)
      if image.save()
        response = JSON "path" => image.image.url(:big), "id" => image.id
        render :text => response
        return
      end
    end
    render :status => 500, :text => "Image upload unsuccessfull"
    # 8 926 89 00 566
    # хз, чей-то телефон
  end
  
end
