### Database operations

Here are the list of requirements and the way we fulfill them,
with focus on the database operations.

___

1. GIVEN I am an unregistered user \
    WHEN I register as Donor \
    THEN the system should record it as a new Donor


    User (donor) creation API call at
    ```
    POST /api/postRegister HTTP/1.1
    Content-Type: application/json

    {
        "username": "username",
        "password": "password",
        "role": "donor"
    }
    ```
    
    triggers user creation query at [users.model.js](../models/users.model.js)
    ```js
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    ```
    immediately verified
    ```js
    if (newUser.role === 'donor')
        newUser.is_verified = true
    ```

    triggers ewallet creation query at [ewallets.model.js](../models/ewallets.model.js)
    ```js
    sql.query("INSERT INTO ewallets SET ?", newEWallet, (err, res) => {
    ```

2. GIVEN I am an unregistered user \
    WHEN I register as Fundraiser \
    THEN the system should notify admin that a new Fundraiser registration has been made

    User (donor) creation API call at
    ```
    POST /api/postRegister HTTP/1.1
    Content-Type: application/json

    {
        "username": "username",
        "password": "password",
        "role": "fundraiser"
    }
    ```

    user creation query at [users.model.js](../models/users.model.js)
    ```js
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    ```
    verification status is null (by default)

    ewallet creation query at [ewallets.model.js](../models/ewallets.model.js)
    ```js
    sql.query("INSERT INTO ewallets SET ?", newEWallet, (err, res) => {
    ```

    admin notification creation at [users.model.js](../models/users.model.js)
    ```js
    Notification.newFundraiserAccount(res.insertId)
    ```

3. GIVEN I am an Admin \
    WHEN there is a new proposal of Fundraiser registration \
    THEN I can choose to verify or reject Fundraiser registration

    View notifications with API call at
    ```
    GET /api/notification/view/fundraisers HTTP/1.1
    ```
    note: must be logged in as an admin

    Update verification status at
    ```
    GET /api/verification/getVerifyFundraiser/3/verify
    ```
    or
    ```
    GET /api/verification/getVerifyFundraiser/3/reject
    ```
    note:
    - 3 is the user_id of the fundraiser
    - must be logged in as an admin

4. GIVEN I am a Donor \
    WHEN I visit the homepage \
    THEN I can see list of verified donation programs

    List verified donation programs at
    ```
    GET /api/donation_program/getVerifiedDonationProgram
    ```
    note: must be logged in as a donor

5. GIVEN I am a Donor \
    WHEN I click the verified donation program \
    THEN I can see the details of the verified donation program

    Get donation program details at
    ```
    GET /api/donation_program/getDonationProgramInfo/1
    ```
    note:
    - 1 is the program_id of the donation program
    - note: must be logged in as a donor

6. GIVEN I am a Donor \
    WHEN I click donate on a verified donation program \
    THEN I can donate money using the balance on my e-wallet

    Send donation API call at
    ```
    POST /api/donation/postDonate/1 HTTP/1.1
    Content-Type: application/json
    Accept: */*
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5MjYzMDUxLCJleHAiOjE2Mjk4Njc4NTF9.NzdTOzfRkH2i9CRpgDkjOxCSp3z-0r6OJYxhejfcN_0

    {
        "amount": 10
    }
    ```
    note:
    - 1 is the program_id of the donation program
    - must be logged in as a donor

7. GIVEN I am a Donor \
    WHEN I visit my dashboard \
    THEN I can see list of my past donations

    View list of past donations of a donor with API call at
    ```
    GET /api/donation/getPastDonations HTTP/1.1
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5MjYzMDUxLCJleHAiOjE2Mjk4Njc4NTF9.NzdTOzfRkH2i9CRpgDkjOxCSp3z-0r6OJYxhejfcN_0
    ```
    note: must be logged in as a donor

    or

    View list of past donations of a donor with user info with API call at
    ```
    GET /api/authentication/getUserInfo HTTP/1.1
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5MjYzMDUxLCJleHAiOjE2Mjk4Njc4NTF9.NzdTOzfRkH2i9CRpgDkjOxCSp3z-0r6OJYxhejfcN_0
    ```
    note: must be logged in as a donor

8. GIVEN I am a Donor \
    WHEN I visit my e-wallet menu \
    THEN I can top-up balance to my e-wallet

    Add balance to ewallet with API call at
    ```
    POST /api/ewallet/postUpdateEWallet/1/increase HTTP/1.1
    Content-Type: application/json
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5MjYzMDUxLCJleHAiOjE2Mjk4Njc4NTF9.NzdTOzfRkH2i9CRpgDkjOxCSp3z-0r6OJYxhejfcN_0
    
    {
        "amount":5
    }
    ```
    note: 
    - 1 is the user_id of the donor
    - must be logged in as a donor

9. GIVEN I am a Fundraiser \
    WHEN I create new donation program \
    THEN The system should notify the admin that a new donation program is created

    admin notification creation at [donation_programs.model.js](../models/donation_programs.model.js)
    ```js
    Notification.newDonationProgram(res.insertId);
    ```

10. GIVEN I am an Admin \
    WHEN There is a new donation program created \
    THEN I can choose to verify or reject the program

    View notifications with API call at
    ```
    GET /api/notification/view/programs HTTP/1.1
    ```

    Update verification status at
    ```
    GET /api/verification/getUpdatePrograms/1/verify
    ```
    or
    ```
    GET /api/verification/getVerifyDonationProgram/1/reject
    ```
    note: 1 is the program_id of the donation program

11. GIVEN I am a Fundraiser \
    WHEN I visit my dashboard \
    THEN I can see list of my donation programs

    Get list of donation programs with API call at
    ```
    GET /api/donation_program/getOwnDonationProgramList HTTP/1.1
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
    ```
    note: must be logged in as a fundraiser

12. GIVEN I am a Fundraiser \
    WHEN I click any of my donation programs \
    THEN I can see the details and amount of money gathered from the donation program

    Get donation program details with API call at
    ```
    GET /api/donation_program/getDonationProgramInfo/1 HTTP/1.1
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
    ```
    note: must be logged in as a fundraiser

13. GIVEN I am a Fundraiser \
    WHEN I click withdraw on my donation program \
    THEN I can choose how much money to withdraw and the system will notify the admin that there is a new withdrawal from your program

    Request a withdrawal with API call at
    ```
    POST /api/withdrawal/postWithdrawDonationProgram/1 HTTP/1.1
    Content-Type: application/json
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
    
    {
        "amount": 10
    }
    ```
    note: must be logged in as a fundraiser

14. GIVEN I am an Admin \
    WHEN There is a new withdrawal from donation program \
    THEN I can choose to reject or accept the withdrawal

    View notifications with API call at
    ```
    GET /api/notification/view/withdrawals HTTP/1.1
    ```

    Update verification status at
    ```
    GET /api/verification/getVerifyWithdrawal/1/verify
    ```
    or
    ```
    GET /api/verification/getVerifyWithdrawal/1/reject
    ```
    note: 1 is the withdrawal_id of the withdrawal

15. GIVEN I am a Fundraiser \
    WHEN My withdrawal is accepted by the admin \
    THEN withdrawal value will be transferred to my e-wallet

    Verify withdrawal with API call at
    ```
    GET /api/verification/getVerifyWithdrawal/3/verify HTTP/1.1
    Cookie: auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5MjcxMjQyLCJleHAiOjE2Mjk4NzYwNDJ9.TygR--dzget_GUnIC08waEKVvjLUsSXAcB5qpK_ElX8
    ```
    note: must be logged in as an admin
