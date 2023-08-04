<?php
// Include the PHPMailerAutoload.php file
require 'PHPMailer-master/src/PHPMailer.php'; // Replace with the actual path to PHPMailerAutoload.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Replace "your_mailchimp_api_key" with your actual Mailchimp API key
    $apiKey = 'e936b94d8fa3b4ec8fbbe6090d2c658d-us21';

    // Set the Mailchimp list ID where you want to send the emails
    $listId = 'b68592fcad';

    // Create the merge fields for your Mailchimp list
    $mergeFields = [
        'FNAME' => $name,
        'ADDRESS' => $address,
        'PHONE' => $phone,
        'MESSAGE' => $message
    ];

    // Mailchimp API URL
    $apiUrl = 'https://us21.api.mailchimp.com/3.0';

    // Mailchimp API endpoint for adding subscribers to a list
    $endpoint = $apiUrl . '/lists/' . $listId . '/members';

    // Data to send to Mailchimp API
    $data = [
        'email_address' => $email,
        'status' => 'subscribed',
        'merge_fields' => $mergeFields
    ];

    // Convert data to JSON format
    $jsonData = json_encode($data);

    // Set up PHPMailer to send the email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.mailchimp.com'; // Mailchimp SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'e936b94d8fa3b4ec8fbbe6090d2c658d-us21'; // Use 'apikey' as the username
    $mail->Password = $apiKey; // Use your Mailchimp API key as the password
    $mail->Port = 587; // Use 587 for TLS or 465 for SSL
    $mail->SMTPSecure = 'tls'; // Use 'tls' or 'ssl' depending on the port

    // Set the sender and recipient email addresses
    $mail->setFrom('vikash21_ug@ee.nits.ac.in', 'Vikash Raj'); // Replace with your email and name
    $mail->addAddress($email, $name); // Use the submitted email and name as the recipient

    // Set email subject and body
    $mail->Subject = 'Contact Form Submission';
    $mail->Body = $message;

    // Send the email using PHPMailer
    if ($mail->send()) {
        // Use cURL to add the subscriber to the Mailchimp list
        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_USERPWD, 'apikey:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            // Success - email sent and subscriber added to Mailchimp list
            http_response_code(200);
        } else {
            // Error - email sent but failed to add subscriber to Mailchimp list
            http_response_code(500);
        }
    } else {
        // Error - failed to send email
        http_response_code(500);
    }
} else {
    http_response_code(405);
}
?>
