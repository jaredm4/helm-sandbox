## Setup

You have two options currently. Minikube (kubernetes-backed development environment) or Docker for Mac Edge (Docker backed development environment that includes single-node Kubernetes).

### Minikube

Minikube, Kubernetes-cli and Helm required.

```bash
# Install the things
brew update
brew install kubernetes-cli kubernetes-helm
brew cask install minikube

# Start up minikube (uses VirtualBox by default)
minikube start
# Optionally to use hyperkit instead of VirtualBox:
minikube start --vm-driver=hyperkit

# Point your Docker cli to VM  (repeat this for every new shell, or add to your bash profile)
eval $(minikube docker-env)

# Install Helm
helm init
```

### Docker for Mac (Edge)

Install [Docker for Mac (Edge)](https://store.docker.com/editions/community/docker-ce-desktop-mac), and enable Kubernetes following [this guide](https://rominirani.com/tutorial-getting-started-with-kubernetes-with-docker-on-mac-7f58467203fd). If you already have Docker for Mac Stable installed, you'll need to re-install the Edge version, which will replace the Stable one. Optionally setup the Kubernetes Dashboard as described there too.

## Running

To get started, build the base Docker image.

```bash
docker build -t hellonode:v1 ./build
```

Setup a Kubernetes Namespace. In practice, this would be "preprod" or "production". Namespaces should be setup by hand after a cluster is created for an environment. For this sandbox, I used foo.

```bash
kubectl create namespace foo
```

Now we can deploy or manage the Helm chart.

```bash
# Create Helm Resources and Deploy. This will echo a randomly generated release name.
$ helm install --namespace foo charts/hellonode
NAME:   funny-chimp
...

# If you forget the release name, you can find it in `helm list`.
$ helm list --namespace foo
NAME       	REVISION	UPDATED                 	STATUS  	CHART          	NAMESPACE
funny-chimp	1       	Tue May 15 15:52:55 2018	DEPLOYED	hellonode-0.0.1	foo

# To see all the Kubernetes Resources created:
$ kubectl get all --namespace foo
NAME                              READY     STATUS    RESTARTS   AGE
pod/funny-chimp-95fd59458-h4r56   1/1       Running   0          40s
...

# To access via web browser for MINIKUBE:
$ minikube --namespace foo service $(helm list --namespace foo -q)-hellonode

# To access via Docker for Mac Edge Kubernetes (the port comes from the service yaml file):
$ open http://localhost:8080

# To upgrade to a new version, build a new Docker image with a new tag, update values.yaml to point to it, then:
$ helm upgrade --namespace foo {release-name} charts/hellonode
Release "funny-chimp" has been upgraded. Happy Helming!
LAST DEPLOYED: Tue May 15 16:04:40 2018
...

# To remove:
$ helm delete {release-name}
release "funny-chimp" deleted
```
