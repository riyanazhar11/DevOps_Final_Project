# Puppet manifest to manage the configuration of the project

# Ensure the project directory exists
file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

# Ensure the necessary subdirectories exist
file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/client':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/data':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/docs':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/layouts':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/loader':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/logs':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/readme_images':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/server':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/shared':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/utils':
  ensure => directory,
  owner  => lookup('project_owner'),
  group  => lookup('project_group'),
  mode   => lookup('project_mode'),
}

# Manage specific files
file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/README.md':
  ensure  => file,
  content => lookup('readme_content'),
  owner   => lookup('project_owner'),
  group   => lookup('project_group'),
  mode    => lookup('file_mode'),
}

file { '/media/riyanazhar10/New Volume1/DevOps Final project/youronlineshop-master/PRIVACY.txt':
  ensure  => file,
  content => lookup('privacy_content'),
  owner   => lookup('project_owner'),
  group   => lookup('project_group'),
  mode    => lookup('file_mode'),
}
