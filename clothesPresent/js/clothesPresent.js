var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,10000);
var renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
var ambient = new THREE.AmbientLight(0xffffff,1);
var urls=["2","4","6_","8","9","10"];
var stages = [];
var spotlights = [];
new PlayerControl(camera);
function setCamera()
{
    camera.position.set(0,0,125);
    camera.lookAt(scene.position);

}
function setRenderer()
{
    renderer.setSize(window.innerWidth,window.innerHeight,false);
    renderer.setClearAlpha(0.2);
}

function setAmbLight()
{
    ambient.position.set(50,50,50);
    scene.add(ambient);
}
function render()
{
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}
function load(idx)
{
            new THREE.GLTFLoader().load(urls[idx]+"/scene.gltf",(gltf)=>
            {
                console.log(gltf);
                scene.add(gltf.scene);
                gltf.scene.position.set(((idx % 2 === 0)?0:100),0,idx*(-100));
                if(idx ===4)
                {
                    gltf.scene.scale.set(0.01,0.01,0.01);
                }
                else if(idx ===3)
                {
                    gltf.scene.scale.set(20,20,20);
                }
                else if(idx === 5)
                {
                    gltf.scene.scale.set(20,20,20);
                }
                else
                {
                    gltf.scene.scale.set(10,10,10);
                }
            })

}
function initBackground(){
    scene.background=new THREE.CubeTextureLoader().setPath('./bg/')
        .load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg']);
}
function initSpotLights()
{
    for(var i = 0;i<urls.length;i++)
    {
        var light = new THREE.SpotLight(0xc6a158,1);
        light.position.set(((i % 2 === 0)?0:100)-100,100,i*(-100)-100);
        scene.add(light);
        spotlights.push(light);
    }
}
function initStages()
{
    for(var i = 0;i<urls.length;i++)
    {
       var cylinder = new THREE.CylinderGeometry(10,10,10,64);
       var material= new THREE.MeshPhongMaterial(
           {
               color:0xd6cdbb
           }
       );
       var mesh = new THREE.Mesh(cylinder,material);
       if(i === 5)
       {
           mesh.position.set(115,-25,-500);
       }
       else
       {
           mesh.position.set(((i % 2 === 0)?0:100),-25,i*(-100));
       }
       scene.add(mesh);
       stages.push(mesh);
    }
}
document.body.appendChild(renderer.domElement);
initBackground();
setCamera();
setRenderer();
setAmbLight();
for(var i = 0;i<urls.length;i++)
{
    load(i);
}
console.log(stages);
console.log(spotlights)
initSpotLights();
initStages();
render()