

FROM maven:3.9.9-eclipse-temurin-21

WORKDIR /app

COPY settings.xml /root/.m2/settings.xml

COPY . .

RUN mvn -B clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/mock-interview-backend-0.0.1-SNAPSHOT.jar"]
