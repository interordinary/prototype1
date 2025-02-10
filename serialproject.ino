
const int ldrPin = A0;
int ldrVal = 0;

void setup() {

  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  ldrVal = analogRead(ldrPin);

  Serial.println(ldrVal);

  delay(5);  
}
