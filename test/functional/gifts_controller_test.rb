require 'test_helper'

class GiftsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gifts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gift" do
    assert_difference('Gift.count') do
      post :create, :gift => { }
    end

    assert_redirected_to gift_path(assigns(:gift))
  end

  test "should show gift" do
    get :show, :id => gifts(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => gifts(:one).to_param
    assert_response :success
  end

  test "should update gift" do
    put :update, :id => gifts(:one).to_param, :gift => { }
    assert_redirected_to gift_path(assigns(:gift))
  end

  test "should destroy gift" do
    assert_difference('Gift.count', -1) do
      delete :destroy, :id => gifts(:one).to_param
    end

    assert_redirected_to gifts_path
  end
end
