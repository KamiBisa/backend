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
    immediately verified at [authControllers.js](../controllers/authControllers.js)
    ```js
    if (role === 'donor')
        user.is_verified = true;
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

    admin notification creation at
    ```
    ```

3. GIVEN I am an Admin \
    WHEN there is a new proposal of Fundraiser registration \
    THEN I can choose to verify or reject Fundraiser registration

    See notifications at
    ```
    ```

    Update verification status at
    ```
    ```

4. GIVEN I am a Donor \
    WHEN I visit the homepage \
    THEN I can see list of verified donation programs

    List verified donation programs at
    ```
    ```

5. GIVEN I am a Donor \
    WHEN I click the verified donation program \
    THEN I can see the details of the verified donation program

    Get donation program details at
    ```
    ```

6. GIVEN I am a Donor \
    WHEN I click donate on a verified donation program \
    THEN I can donate money using the balance on my e-wallet

7. GIVEN I am a Donor \
    WHEN I visit my dashboard \
    THEN I can see list of my past donations

8. GIVEN I am a Donor \
    WHEN I visit my e-wallet menu \
    THEN I can top-up balance to my e-wallet

9. GIVEN I am a Fundraiser \
    WHEN I create new donation program \
    THEN The system should notify the admin that a new donation program is created

10. GIVEN I am an Admin \
    WHEN There is a new donation program created \
    THEN I can choose to verify or reject the program

11. GIVEN I am a Fundraiser \
    WHEN I visit my dashboard \
    THEN I can see list of my donation programs

12. GIVEN I am a Fundraiser \
    WHEN I click any of my donation programs \
    THEN I can see the details and amount of money gathered from the donation program

13. GIVEN I am a Fundraiser \
    WHEN I click withdraw on my donation program \
    THEN I can choose how much money to withdraw and the system will notify the admin that there is a new withdrawal from your program

14. GIVEN I am an Admin \
    WHEN There is a new withdrawal from donation program \
    THEN I can choose to reject or accept the withdrawal

15. GIVEN I am a Fundraiser \
    WHEN My withdrawal is accepted by the admin \
    THEN withdrawal value will be transferred to my e-wallet

