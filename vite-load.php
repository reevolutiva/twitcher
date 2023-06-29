<?php

namespace Kucrut\ViteForWPExample\React;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/enqueue.php';

Enqueue\frontend();
Enqueue\backend();

