{{/* lovingly borrowed from https://github.com/bitnami/charts/blob/master/bitnami/apache/templates/_helpers.tpl */}}

{{- define "name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 24 -}}
{{- end -}}

{{- define "fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- printf "%s-%s" .Release.Name $name | trunc 24 -}}
{{- end -}}
