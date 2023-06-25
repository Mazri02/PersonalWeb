import java.util.Scanner;

class Event {

    private String eventName,venue,date,hourStart,hourEnd;

    public Event(String eventName, String venue, String date, String
            hourStart, String hourEnd)
    {
        this.eventName=eventName;
        this.venue=venue;
        this.date=date;
        this.hourStart=hourStart;
        this.hourEnd=hourEnd;
    }

    //Accessor Method
    public void setDate(String date) {this.date = date;}
    public void setEventName(String eventName) {this.eventName =
            eventName;}
    public void setHourEnd(String hourEnd) {this.hourEnd = hourEnd;}
    public void setHourStart(String hourStart) {this.hourStart =
            hourStart;}
    public void setVenue(String venue) {this.venue = venue;}

    //Mutator Method
    public String getEventName(){return eventName;}
    public String getVenue(){return venue;}
    public String getDate(){return date;}
    public String getHourStart(){return hourStart;}

    public String getHourEnd(){return hourEnd;}

    public String toString(){
        return "Event Name : " + eventName + "\nDate :" + date + "\nEvent Hour Start : " + hourStart + "\nEvent Hour End : " + hourEnd;

    }
}

class Person {
    private String name, address,venueName,identifyNo,duration;
    private int contact;
    private double bookingCharge;
    private Event status;

    Scanner num = new Scanner(System.in);

    public Person(String name, String address, int contact,String
            identifyNo,Event status)
    {
        this.identifyNo = identifyNo;
        this.status = status;
        this.name=name;
        this.address=address;
        this.contact=contact;
    }

    //Accessor Method
    public void setName(String name) {this.name = name;}
    public void setAddress(String address) {this.address = address;}
    public void setContact(int contact) {this.contact = contact;}

    public void setStatus(Event status) {this.status = status;}
    public void setIdentifyNo(String identifyNo) {this.identifyNo =
            identifyNo;}

    //Mutator Method
    public String getName(){return name;}
    public String getAddress(){return address;}
    public int getContact(){return contact;}
    public Event getStatus() {return status;}
    public String getIdentifyNo() {return identifyNo;}

    //Processor Method
    public double calcTotal(String venue) {
        double price = 0,minute = 0;
        int hour;
        String minuteStart = status.getHourStart().substring(2,4);
        String minuteEnd = status.getHourEnd().substring(2,4);
        String hourStart = status.getHourStart().substring(0,2);
        String hourEnd = status.getHourEnd().substring(0,2);

        hour = Integer.parseInt(hourEnd) - Integer.parseInt(hourStart);
        minute = Double.parseDouble(minuteEnd) -
                Double.parseDouble(minuteStart);

        if(minute < 0){
            hour = hour - 1;
            minute *= -1;
        }

        duration = hour + " hour " + minute + " minute";

        minute /= 60;

        if(identifyNo.length() <= 10){
            price = 0;

            if(venue.equalsIgnoreCase("dt")){
                venueName = "Dewan Titiwangsa";
            } else if((venue.equalsIgnoreCase("dk200"))){
                venueName = "Dewan Kuliah 200";
            } else if((venue.equalsIgnoreCase("dk300"))){
                venueName = "Dewan Kuliah 300";
            } else {
                System.out.println("An Error occured!!");
            }

        } else {
            if(venue.equalsIgnoreCase("dt")){
                price = 300;
                venueName = "Dewan Titiwangsa";
            } else if((venue.equalsIgnoreCase("dk200"))){
                price = 150;
                venueName = "Dewan Kuliah 200";
            } else if((venue.equalsIgnoreCase("dk300"))){
                price = 100;
                venueName = "Dewan Kuliah 300";
            } else {
                System.out.println("An Error occured!!");
            }
        }

        bookingCharge = (price*hour) + (price*minute);
        return bookingCharge;
    }

    public void display(){
        System.out.println("****************************************************");
        System.out.println("Person in-charge Details");
        System.out.println("Name : " + name);
        System.out.println("Identification Number :" + identifyNo);
        System.out.println("Address : " + address);
        System.out.println("Contact : +60" + contact);

        System.out.println("****************************************************");
        System.out.println("Event Details");
        System.out.println(status.toString());
        System.out.println("Event Venue : " + venueName);
        System.out.println("Duration : " + duration);
        System.out.println("Booking Charge : RM " + bookingCharge);

    }

}

class VBS{
    public static void main(String[] args){
        String name,eventName,address,venue,date,identifyNo = "",hourStart,hourEnd;

        boolean decision = true;
        int contact,count = 0,countDT = 0,countDK200 = 0,countDK300 =
                0;
        int limit = 20;
        double sum = 0;

        Scanner text = new Scanner(System.in);
        Scanner num = new Scanner(System.in);
        Scanner choice = new Scanner(System.in);

        Person[] booking = new Person[limit];
        Event[] details = new Event[limit];

        while((decision != false) && (count != limit)){
            System.out.println("****************************************************");
            System.out.println("Person in-charge Detail");
            System.out.println("Person's Name : ");
            name = text.nextLine();
            System.out.println("Person's Address : ");
            address = text.nextLine();
            System.out.println("Person's Contact (Numbers Only) : ");
            contact = num.nextInt();
            System.out.println("Person's Identification [StaffID/Student ID/IC Number]: ");
            identifyNo= text.nextLine();

            System.out.println("****************************************************");
            System.out.println("Event Details");

            System.out.println("Event Name : ");
            eventName = text.nextLine();
            System.out.println("Event Venue : Choose from 3 of the venue [DK200/DK300/DT]" );
            venue = text.nextLine();
            System.out.println("Event Date : ");
            date = text.nextLine();
            System.out.println("Event Hour Start : ");
            hourStart = text.nextLine();
            System.out.println("Event Hour End : ");
            hourEnd = text.nextLine();
            System.out.println("****************************************************");

            details[count] = new Event(eventName,venue,date,hourStart,hourEnd);
            booking[count] = new Person(name,address,contact,identifyNo,details[count]); //Input All the Details
            booking[count].calcTotal(venue);
            sum += booking[count].calcTotal(venue);

            if(details[count].getVenue().equalsIgnoreCase("dt")){
                countDT++;
            } else
            if(details[count].getVenue().equalsIgnoreCase("dk200")){
                countDK200++;
            } else
            if(details[count].getVenue().equalsIgnoreCase("dk300")){
                countDK300++;
            }

            System.out.println("Students and Staff won't be charged!");

            booking[count].display();

            System.out.println("****************************************************");
            count++;
            System.out.println("Do you want to go again? [True/False]");
            decision = choice.nextBoolean();

        }

        System.out.println("You reach the maximum storage of " + count
                + " storage");
        System.out.println("****************************************************");
        System.out.println("Total Venue of Dewan Titiwangsa : " +
                countDT);
        System.out.println("Total Venue of Dewan Kuliah 200 : " +
                countDK200);
        System.out.println("Total Venue of Dewan Kuliah 300 : " +
                countDK300);

        System.out.println("Total Booking Charge : RM " + sum);
    }
}