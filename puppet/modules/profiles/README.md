# Profiles Module

## Overview

This module provides higher-level abstractions for managing common configurations and services. Profiles encapsulate the configuration of multiple resources and modules to simplify the management of complex systems.

## Usage

### Classes

- `profiles::web_server`: Manages the configuration of a web server, including Apache and related services.

### Parameters

- `ensure`: Ensures the web server is running or stopped.
- `vhosts`: A hash of virtual hosts to manage.
- `mods`: A list of modules to enable or disable.

## Example

```puppet
class { 'profiles::web_server':
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

- `apache`: Manages the Apache web server.
- `stdlib`: Provides standard library functions and types.

## Contributing

Contributions are welcome! Please submit pull requests or open issues on the project's GitHub repository.

## License

This module is released under the Apache License, Version 2.0.
