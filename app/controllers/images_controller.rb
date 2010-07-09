class ImagesController < ApplicationController
  
  session :cookie_only => false, :only => :create
  skip_before_filter :verify_authenticity_token
  
  def create
    if params[:file]
      image = Image.new(:image => params[:file])
      if image.save()
        render :text => image.image.url(:thumbnail)
      end
    end
  end
  
end
