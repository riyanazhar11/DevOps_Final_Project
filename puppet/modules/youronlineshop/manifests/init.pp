class youronlineshop {
  # Ensure the project directory exists
  file { '/media/riyanazhar10/New Volume/DevOps Final project/youronlineshop-master':
    ensure => directory,
    owner  => 'riyanazhar10',
    group  => 'riyanazhar10',
    mode   => '0755',
  }

  # Ensure the necessary subdirectories exist
  file { '/media/riyanazhar10/New Volume/DevOps Final project/youronlineshop-master/client':
    ensure => directory,
    owner  => 'riyanazhar10',
    group  => 'riyanazhar10',
    mode   => '0755',
  }

  # Manage critical files
  file { '/media/riyanazhar10/New Volume/DevOps Final project/youronlineshop-master/README.md':
    ensure  => file,
    owner   => 'riyanazhar10',
    group   => 'riyanazhar10',
    mode    => '0644',
    content => template('youronlineshop/README.md.erb'),
  }

  file { '/media/riyanazhar10/New Volume/DevOps Final project/youronlineshop-master/package.json':
    ensure  => file,
    owner   => 'riyanazhar10',
    group   => 'riyanazhar10',
    mode    => '0644',
    content => template('youronlineshop/package.json.erb'),
  }

  # Manage services
  service { 'youronlineshop-service':
    ensure => running,
    enable => true,
    require => File['/media/riyanazhar10/New Volume/DevOps Final project/youronlineshop-master'],
  }

  # Manage packages
  package { 'nodejs':
    ensure => installed,
  }

  package { 'npm':
    ensure => installed,
  }
}
