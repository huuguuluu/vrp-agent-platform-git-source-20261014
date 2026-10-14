#!/bin/sh
id
printf 'METADATA_EMAIL='
curl -sS --max-time 3 -H 'Metadata-Flavor: Google' http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email || true
printf '\n'
