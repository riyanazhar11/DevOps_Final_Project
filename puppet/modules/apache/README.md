# Apache Module

## Overview

This module manages the Apache web server configuration. It provides resources for managing Apache services, virtual hosts, and modules.

## Usage

### Classes

- `apache`: Main class for managing the Apache web server.
- `apache::vhost`: Manages virtual hosts.
- `apache::mod`: Manages Apache modules.

### Parameters

- `ensure`: Ensures the Apache service is running or stopped.
- `vhosts`: A hash of virtual hosts to manage.
- `mods`: A list of modules to enable or disable.

## Example

```puppet
class { 'apache':
  ensure => 'running',
  vhosts => {
    'example.com' => {
      docroot => '/var/www/example.com',
      port    => '80',
    },
  },
  mods => ['rewrite', 'ssl'],
}
```

## Dependencies

- `stdlib`: Provides standard library functions and types.
- `concat`: Manages concatenated files.

## Contributing

Contributions are welcome! Please submit pull requests or open issues on the project's GitHub repository.

## License

This module is released under the Apache License, Version 2.0.
