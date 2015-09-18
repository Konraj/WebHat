struct lightProperties
{
    vec3 intensity;
    vec3 ambient;
    vec4 position;
    bool enabled;
};


attribute vec4 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;
attribute vec2 vTexelCoord;


// Texture
varying vec2 fTexCoord;
//uniform vec2 vTexCoord;
uniform sampler2D texture;
uniform bool vTextEnabled;
uniform int uvMapping;
varying vec2 fTextEnabled;

varying vec4  fColor;

uniform vec3 theta;
uniform vec3 scale;
uniform vec3 translate;
uniform vec3 rotationPoint;

uniform vec4 lightPosition;

// Material Information
uniform vec4 materialAmbient;
uniform vec4 materialDiffuse;
uniform vec4 materialSpecular;
uniform float materialShininess;



uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;


uniform lightProperties light[4];

const float PI = 3.14159265358979323846264;
const float TWOPI = PI*2.0;


vec2 uv_spherical(vec4 pos)
{
	 float theta = asin(pos.y);
    float gamma = atan(pos.z,pos.x);

	   float v = 0.5 + theta/PI;
	   float u = 0.5  - gamma / (TWOPI);

	   return vec2(u,v);
}

vec2 uv_spherical_swirl(vec4 pos)
{
	 float theta = asin(pos.y);
    float gamma = atan(pos.z,pos.x);

	 float v = 0.5 + theta/PI;
	 float u = 0.5  - gamma / (TWOPI);

	   return vec2(u,tan(v)* tan(v));
}

vec2 uv_spherical_smallwaste(vec4 pos)
{
	 float theta = asin(sin(pos.y)* cos(pos.y));
    float gamma = atan(pos.z,pos.x);

	 float v = 0.5 + theta/PI;
	 float u = 0.5  - gamma / (TWOPI);

	  return vec2(u,tan(v)* tan(v));
}

float attenuation(vec3 v1, vec3 v2, float c, float l, float q)
{
     vec3 distv = v1 - v2;
     float dist= sqrt(dot(distv,distv));

     return 1.0/ (c + l * dist + q * (dist*dist));
}

vec4 phongLighting(vec4 vertexPos, vec3 vertexNormal, int lightIndex)
{
    vec3 vpos = vertexPos.xyz;

    vec3 lpos = light[lightIndex].position.xyz;
    vec4 intensity = vec4(light[lightIndex].intensity,1);

    vec4 ambient = materialAmbient;

    vec3 L = normalize( lpos - vpos );
    vec3 E = normalize( -vpos );
    vec3 H = normalize( L + E );
    vec3 N = normalize(vertexNormal.xyz);

    float Kd = max( dot(L, N), 0.0 );
    vec4  diffuse = Kd * materialDiffuse;

    float Ks = pow( max(dot(N, H), 0.0), materialShininess );
    vec4  specular = Ks * materialSpecular;

    if( dot(L, N) < 0.0 ) {
		    specular = vec4(0.0, 0.0, 0.0, 1.0);
    }

    float att = attenuation(vpos,lpos,0.0,0.5,0.0);


    return ambient + (att * diffuse *  intensity) + (att * specular * intensity);
}

void main()
{

    vec3 angles = radians( theta );
    vec3 c = cos( angles );
    vec3 s = sin( angles );

    // COLUMN MAJOR

    mat4 tr = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translate.x, translate.y, translate.z, 1.0);

    mat4 rotP = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    -rotationPoint.x, -rotationPoint.y, -rotationPoint.z, 1.0);

    mat4 rotPInv = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    rotationPoint.x, rotationPoint.y, rotationPoint.z, 1.0);

    mat4 sc = mat4 (
    scale.x, 0.0, 0.0, 0.0,
    0.0, scale.y, 0.0, 0.0,
    0.0, 0.0, scale.z, 0.0,
    0.0, 0.0, 0.0, 1.0);

    mat4 rx = mat4(
    1.0,  0.0,  0.0, 0.0,
    0.0,  c.x,  s.x, 0.0,
    0.0, -s.x,  c.x, 0.0,
    0.0,  0.0,  0.0, 1.0 );

    mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0,  0.0, 0.0,
    s.y, 0.0,  c.y, 0.0,
    0.0, 0.0,  0.0, 1.0 );


    mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z,  c.z, 0.0, 0.0,
    0.0,  0.0, 1.0, 0.0,
    0.0,  0.0, 0.0, 1.0 );

vec3 vNormalN = (rotPInv *rz * ry * rx * rotP * tr *  vec4(vNormal,0)).xyz;
vec4 pp       = rotPInv *rz * ry * rx * rotP  * tr * sc * vPosition;
vec4 position = modelViewMatrix *  pp;


gl_PointSize = 5.0;
gl_Position = projectionMatrix * position;


 if (dot(vNormal,vNormal) == 0.0)
 {
       fColor = vec4(vColor,1.0);
 }
 else
 {
    fColor = vec4(0.0,0.0,0.0,0.0);

    for (int i = 0; i < 4; i++)
    {
        if (light[i].enabled)
        {
			vec4 phong = phongLighting(pp,vNormalN,i);
			fColor = fColor +  phong;
        }
    }
    fColor.a = 1.0;
 }


	if (vTextEnabled == true) {
			if (uvMapping == 0)
				fTexCoord = uv_spherical(vPosition);
			else if (uvMapping == 1)
				fTexCoord = uv_spherical_smallwaste(vPosition);
			else if (uvMapping == 2)
				fTexCoord = uv_spherical_swirl(vPosition);
			else { // default
				fTexCoord = vTexelCoord;
			}

		fTextEnabled = vec2(1.0,1.0);
   }

   else {
   	fTextEnabled = vec2(0.0,0.0);
   }
 }