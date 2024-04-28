uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

uniform float uColorOffset;
uniform float uColorMultiplier;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying float vElevation;

void main()
{ 
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    float fogDepth = gl_FragCoord.z / gl_FragCoord.w;
    
    float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
    
    gl_FragColor = vec4(mix(color, fogColor, fogFactor), 1.0);   
    #include <colorspace_fragment>


}