## Setup

Minikube, Kubernetes-cli and Helm required.

```bash
# Install the things
brew update
brew install kubernetes-cli kubernetes-helm
brew cask install minikube

# Turn on the things
minikube start --vm-driver=hyperkit

# Point your Docker cli to VM  (repeat this for every new shell, or add to your bash profile)
eval $(minikube docker-env)

# Install Helm
helm init
```

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

# If you forget the release name, you can find it in `helm list`.
$ helm list --namespace foo
NAME       	REVISION	UPDATED                 	STATUS  	CHART          	NAMESPACE
funny-chimp	1       	Tue May 15 15:52:55 2018	DEPLOYED	hellonode-0.0.1	foo

# To see all the Kubernetes Resources created:
$ kubectl get all --namespace foo
NAME                              READY     STATUS    RESTARTS   AGE
pod/funny-chimp-95fd59458-h4r56   1/1       Running   0          40s
...

# To access via web browser:
$ minikube --namespace foo service hellonode

# To upgrade to a new version, build a new Docker image with a new tag, update values.yaml to point to it, then:
$ helm upgrade --namespace foo {release-name} charts/hellonode
Release "funny-chimp" has been upgraded. Happy Helming!
LAST DEPLOYED: Tue May 15 16:04:40 2018
...

# To remove:
$ helm delete {release-name}
```
