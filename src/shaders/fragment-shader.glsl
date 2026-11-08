in vec2 vTextureCoord;
in vec2 vFilterCoord;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform float aspectRatio;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);

    vec2 normalizeCoord = vFilterCoord - 0.5;

    normalizeCoord.x *= aspectRatio;
    float width = 0.5 * aspectRatio;

    if(length(normalizeCoord) <= 0.5) {
        finalColor = color;
    } else {
        finalColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}