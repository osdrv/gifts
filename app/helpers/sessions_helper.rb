module SessionsHelper
  def get_user_id_by_sessid(sid)
    options = {
      :namespace => 'rack:session',
      :memcache_server => 'localhost:11211'
    }
    pool = MemCache.new(options[:memcache_server], options)
    unless pool.servers.any? { |s| s.alive? }
      raise "#{self} unable to find server during initialization."
    end
    begin
      session = pool.get(sid) || {}
    rescue MemCache::MemCacheError, Errno::ECONNREFUSED
      session = {}
    end
    if session[:user_id]
      return session[:user_id].to_i
    end
    return nil
  end
end