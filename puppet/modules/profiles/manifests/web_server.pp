class profiles::web_server {
  # Install and configure the web server
  class { 'apache': }

  # Manage the web server configuration file
  file { '/etc/httpd/conf/httpd.conf':
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    content => template('profiles/web_server/httpd.conf.erb'),
  }
}
