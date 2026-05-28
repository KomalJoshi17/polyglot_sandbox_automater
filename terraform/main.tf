resource "aws_instance" "psa2_server" {
ami           = "ami-0f58b397bc5c1f2e8"
instance_type = "t3.micro"
key_name      = "psa2-key"

tags = {
Name = "PSA2-Server"
}
}

resource "aws_eip" "psa2_eip" {
instance = aws_instance.psa2_server.id

tags = {
Name = "PSA2-Elastic-IP"
}
}
