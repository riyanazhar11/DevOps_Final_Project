# Roles Module

## Overview

This module defines roles for different types of servers, such as web servers, database servers, and application servers. Roles encapsulate the configuration of multiple profiles and modules to simplify the management of server roles.

## Usage

### Classes

- `roles::web_server`: Manages the configuration of a web server, including the web server itself and related services.

### Parameters

- `ensure`: Ensures the web server is running or stopped.
- `vhosts`: A hash of virtual hosts to manage.
- `mods`: A list of modules to enable or disable.

## Example

```puppet
class { 'roles::web_server':
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

- `profiles::web_server`: Manages the configuration of a web server.
- `stdlib`: Provides standard library functions and types.

## Contributing

Contributions are welcome! Please submit pull requests or open issues on the project's GitHub repository.

## License

This module is released under the Apache License, Version 2.0.
