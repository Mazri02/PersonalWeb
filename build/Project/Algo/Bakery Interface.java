import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.LineBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.*;
import java.util.StringTokenizer;

class Assignment248{
    public static void main(String[] args) throws IOException{
        try
        {
            BufferedReader br = new BufferedReader (new FileReader ("cakeOrder.txt"));
            PrintWriter pickOut = new PrintWriter (new FileWriter ("pickup.txt"));
            PrintWriter delOut = new PrintWriter (new FileWriter ("delivery.txt"));
            Queue cakeQ =new Queue();
            Queue tempQ =new Queue();
            GraphicalInterface GUI = new GraphicalInterface();

            //a)Read the records from ‘cakeOrder.txt’
            //b)instantiate an object of the ‘cakeOrder’
            //c) store it into a queue data structure named cakeQ.
            String s = br.readLine();
            while(s != null){
                StringTokenizer st = new StringTokenizer(s,"*");
                String custID = st.nextToken();
                String cakeType= st.nextToken();
                int qty = Integer.parseInt(st.nextToken());

                Cake cakeOrder = new Cake(custID,cakeType,qty);
                cakeQ.enqueue(cakeOrder);
                s = br.readLine();
            }

            //d) Display all the cakeOrder data from the list
            String QuestionD = "";
            while(!cakeQ.isEmpty()){
                Cake display = cakeQ.dequeue();
                QuestionD += display.toStringGUI() + "<br>";
                tempQ.enqueue(display);
            }
            GUI.setStringValue("<html>" + QuestionD + "</html>","D");


            //e)The first character of custID is based on the delivery type. If the first character is 'P',
            //that means the customer choose to pick up the cake, and if the first character is 'D', that means
            //the customer chooses to have delivery service. E.g. custID are P002, D112, etc. Write the data
            //for delivery into delivery.txt output file and the data for customer that chooses self pick up into pickup.txt.
            String QuestionE_PickUp = "";
            String QuestionE_Delivery = "";
            while(!tempQ.isEmpty()){
                Cake customer = tempQ.dequeue();
                if(customer.getCustID().substring(0,1).equalsIgnoreCase("P")){
                    pickOut.println(customer);
                    QuestionE_PickUp += customer.toStringGUI() + "<br>";
                }
                else if(customer.getCustID().substring(0,1).equalsIgnoreCase("D")){
                    delOut.println(customer);
                    QuestionE_Delivery += customer.toStringGUI() + "<br>";
                }
                cakeQ.enqueue(customer);
            }
            GUI.setStringValue("<html>" + "Data For PickUp : " + "<br>" + QuestionE_PickUp + "<br><br>" +  "Data For Delivery : " + "<br>" + QuestionE_Delivery + "</html>","E");

            //f)Display the total quantity order for each cake type and display name of the highest total order
            int countChocCake = 0,countRedVelvet = 0,countBurntCheeseCake = 0,countBlackForest = 0,highest = 0;
            String top = null,QuestionF = "";

            while(!cakeQ.isEmpty()){
                Cake cakeType = cakeQ.dequeue();
                if(cakeType.getCakeType().equalsIgnoreCase("D24 Chocolate Cake")){
                    countChocCake++;
                } else if (cakeType.getCakeType().equalsIgnoreCase("Red velvet")){
                    countRedVelvet++;
                } else if (cakeType.getCakeType().equalsIgnoreCase("Burnt Cheese Cake")){
                    countBurntCheeseCake++;
                } else if (cakeType.getCakeType().equalsIgnoreCase("Black Forest")){
                    countBlackForest++;
                }

                tempQ.enqueue(cakeType);
            }

            int[] totalCount = {countBlackForest,countBurntCheeseCake,countChocCake,countRedVelvet};
            String[] cakeName = {"Black Forest","Burnt Cheese Cake","Chocolate Cake","Red Velvet"};

            for (int i = 0; i < totalCount.length; i++) {
                if(totalCount[i] > highest){
                    highest = totalCount[i];
                    top = cakeName[i];
                }
            }

            QuestionF = "Total for D24 Chocolate Cake is " + countChocCake + "<br>" + "Total for Red Velvet is " + countRedVelvet + "<br>" + "Total for Burnt Cheese Cake is " + countBurntCheeseCake
                    + "<br>" + "Total for Black Forest is " + countBlackForest + "<br><br>" + "The highest total is " + highest + " for " + top;

            GUI.setStringValue("<html>" + QuestionF + "</html>","F");

            //g)Display the receipt that displays the custID, cakeType, price(using detPrice() method), qty,
            //payment for each order. To calculate the payment for each order you need to multiply quantity
            //with the cake price and extra charge of RM 5.00 for delivery service. Lastly, display the total
            //payment for all the orders.

            String QuestionG = "";
            int count = 0;

            while(!tempQ.isEmpty()){
                Cake receipt = tempQ.dequeue();
                double total;

                if(receipt.getCustID().substring(0,1).equalsIgnoreCase("D")){
                    total = receipt.detPrice() + 5;
                } else {
                    total = receipt.detPrice();
                }

                count++;
                QuestionG += receipt.toStringReceipt(count) + "<br>Total : RM" + total + "<br><br>";
                cakeQ.enqueue(receipt);
            }
            GUI.setStringValue("<html>" + QuestionG + "</html>","G");

            br.close();
            pickOut.close();
            delOut.close();
            GUI.MainFrame();
        }
        catch(Exception e) {System.err.println(e.getMessage());}
    }
}

class Cake {
    private String custID; //D001, P003
    private String cakeType; //D24 Chocolate Cake,Red Velvet,Burnt Cheese Cake,Black Forest
    private int qty;
    private double price;

    public Cake(String ID,String cakeType, int qty)
    {    this.custID=ID;
        this.cakeType=cakeType;
        this.qty=qty;
    }

    public void setID(String ID){this.custID=ID;}
    public void setCakeType(String cakeType){this.cakeType=cakeType;}
    public void setQty(int qty){this.qty=qty;}

    //2.a)Write the retriever method for custID, cakeType and qty
    public String getCustID() {return custID;}
    public String getCakeType() {return cakeType;}
    public int getQty() {return qty;}

    //2.b)Write the detPrice() method that will return the price of cake based on cakeType.Refer 2_GroupProject.docx
    public double detPrice() {
        if (cakeType.equalsIgnoreCase("D24 Chocolate Cake")){
            price = 120;
        } else if (cakeType.equalsIgnoreCase("Red Velvet")){
            price = 80;
        } else if (cakeType.equalsIgnoreCase("Burnt Cheese Cake")){
            price = 100;
        } else if (cakeType.equalsIgnoreCase("Black Forest")){
            price = 80;
        }

        return price*qty;
    }

    //Customer ID:XXXX	Cake Type:XXXXXXX           Price: RM XX.XX	     Quantity:XX
    public String toString() {
        String output;

        if(cakeType.equalsIgnoreCase("Red Velvet")){
            output = "Customer ID : " + custID + "\tCake Type : " + cakeType +"\t\t\t\tPrice : " + detPrice() + "\tQuantity : " + qty;
        } else if(cakeType.equalsIgnoreCase("Black Forest")){
            output = "Customer ID : " + custID + "\tCake Type : " + cakeType +"\t\t\tPrice : " + detPrice() + "\tQuantity : " + qty;
        } else {
            output = "Customer ID : " + custID + "\tCake Type : " + cakeType +"\t\tPrice : " + detPrice() + "\tQuantity : " + qty;
        }

        return output;
    }

    public String toStringGUI() {
        String output;

        if(cakeType.equalsIgnoreCase("Red Velvet")){
            output = "Customer ID : " + custID + "&emsp;&emsp;Cake Type : " + cakeType +"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Price : " + detPrice() + "&emsp;&emsp;Quantity : " + qty;
        } else if(cakeType.equalsIgnoreCase("Black Forest")){
            output = "Customer ID : " + custID + "&emsp;&emsp;Cake Type : " + cakeType +"&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;Price : " + detPrice() + "&emsp;&emsp;Quantity : " + qty;
        } else {
            output = "Customer ID : " + custID + "&emsp;&emsp;Cake Type : " + cakeType +"&emsp;&emsp;&emsp;Price : " + detPrice() + "&emsp;&emsp;Quantity : " + qty;
        }

        return output;
    }

    public String toStringReceipt(int count) {
        String type = "";

        if(custID.equalsIgnoreCase("D")){
            type = "Delivery";
        } else {
            type = "PickUp";
        }

        return "<br>" + "+++++++++++++++++++++++++++++++++++" + "<br>" + "Customer No " + count + "<br>" + "+++++++++++++++++++++++++++++++++++"
                + "<br>" + "Customer ID : " + this.custID + "<br>" + "Cake Name : " + this.cakeType + "<br>" + "Price : RM " + this.price
                + "<br>" + "Quantity : " + this.qty + "<br>" + "Delivery/Self PickUp : " + type;
    }
}

class Node {
    Cake element;
    Node next;

    public Node(Cake element) {
        this.element = element;
    }
}

class LinkedList {

    private Node head, current, tail;

    public LinkedList() {
        head = current = tail = null;
    }

    public boolean isEmpty() {
        return head == null;
    }

    public void addFirst(Cake element) {
        Node newNode = new Node(element);
        newNode.next = this.head;
        this.head = newNode;
        if(this.tail == null) {
            this.tail = this.head;
        }
    }

    public void addLast(Cake element) {
        Node newNode = new Node(element);

        if(this.tail == null) {
            this.head = this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
    }

    public Cake getFirst() {
        if (this.isEmpty()) {
            return null;
        }
        else {
            this.current = this.head;
            return this.current.element;
        }
    }

    public Cake getLast() {
        if (this.isEmpty()) {
            return null;
        }
        else {
            return this.tail.element;
        }
    }

    public Cake getNext() {
        if (this.current == this.tail) {
            return null;
        }
        else {
            this.current = this.current.next;
            return this.current.element;
        }
    }

    public void clear() {
        this.head = this.current = this.tail = null;

    }

    public boolean contains(Cake element) {
        boolean isContain = false;
        this.current = this.head;

        while (this.current != null) {
            if (element.equals(this.current.element)) {
                isContain = true;
                break;
            }
        }

        return isContain;
    }

    public Cake removeFirst() {
        if (this.isEmpty()) {
            return null;
        }
        else {
            this.current = this.head;
            this.head = this.head.next;
            if (this.head == null)
                this.tail = null;
            return current.element;
        }
    }

    public Cake removeLast() {
        if (this.isEmpty())
            return null;
        else if (this.head == this.tail) {
            this.current = this.head;
            this.head = this.tail = null;
            return current.element;
        }
        else {
            this.current = this.head;
            while (this.current.next != tail) {
                this.current = this.current.next;
            }
            Node temp = this.tail;
            this.tail = this.current;
            this.tail.next = null;
            return temp.element;
        }
    }

    public Cake removeAfter(Cake element) {
        if (this.isEmpty()) {
            return null;
        }
        else if (this.head == this.tail) {
            this.current = this.head;
            this.head = this.tail = null;
            return current.element;

        }
        else {
            Node previous = this.head;
            while (previous.next != null) {
                if (element.equals(previous.element))
                {
                    break;
                }
                previous = previous.next;
            }
            current = previous.next;
            previous.next = current.next;
            return current.element;
        }
    }

    public String toString() {
        StringBuilder result = new StringBuilder("[");
        if (this.isEmpty()) {
            result.append("The list is empty]");
        }
        else {
            this.current = this.head;
            while (this.current != null) {
                result.append(this.current.element);
                this.current = this.current.next;
                if (this.current != null)
                    result.append(", ");
                else
                    result.append("]");
            }
        }
        return result.toString();
    }
}

class Queue extends LinkedList {
    public Queue() {}

    public Queue(Cake cakeOrder) {
    }

    public void enqueue(Cake element) {
        addLast(element);
    }

    public Cake dequeue() {
        return removeFirst();
    }

    public Cake getFront() {
        return getFirst();
    }
}

class GraphicalInterface extends JFrame {
    JFrame frame = new JFrame();

    String questionD = null;
    String questionE = null;
    String questionF = null;
    String questionG = null;

    Border backgroundBorder = BorderFactory.createLineBorder(Color.BLACK,5);
    Border mainBorder = BorderFactory.createSoftBevelBorder(1);

    JLabel maintitlePlacement = new JLabel();
    JLabel textPlacement = new JLabel();
    JLabel backgroundPlacement = new JLabel();

    JPanel buttonPlacement = new JPanel();
    JLayeredPane radioPlacement = new JLayeredPane();

    JButton chooseButton = new JButton("Choose");
    JButton cancelButton = new JButton("Cancel");

    JRadioButton QuestionD = new JRadioButton("Question D                     ");
    JRadioButton QuestionE = new JRadioButton("Question E                     ");
    JRadioButton QuestionF = new JRadioButton("Question F                     ");
    JRadioButton QuestionG = new JRadioButton("Question G                     ");
    ButtonGroup group = new ButtonGroup();

    public void MainFrame() throws IOException {
        BufferedImage pict = ImageIO.read(new File("Logo.png"));
        Image result = pict.getScaledInstance(400,150,Image.SCALE_SMOOTH);
        ImageIcon logo = new ImageIcon(result);

        BufferedImage pict1 = ImageIO.read(new File("background1.png"));
        Image result1 = pict1.getScaledInstance(400,500,Image.SCALE_SMOOTH);
        ImageIcon background = new ImageIcon(result1);

        backgroundPlacement.setIcon(background);
        backgroundPlacement.setBackground(new Color(255,234,208,100));
        backgroundPlacement.setOpaque(true);
        backgroundPlacement.setBorder(backgroundBorder);

        maintitlePlacement.setIcon(logo);
        maintitlePlacement.setHorizontalTextPosition(JLabel.CENTER);
        maintitlePlacement.setVerticalTextPosition(JLabel.CENTER);
        maintitlePlacement.setBackground(new Color(194,98,57,200));
        maintitlePlacement.setOpaque(true);
        maintitlePlacement.setSize(400,200);
        maintitlePlacement.setVerticalAlignment(JLabel.CENTER);
        maintitlePlacement.setHorizontalAlignment(JLabel.CENTER);
        maintitlePlacement.setBounds(5,20,374,150);
        maintitlePlacement.setBorder(mainBorder);

        radioPlacement.setBounds(10,153,300,250);
        radioPlacement.add(QuestionD);
        radioPlacement.add(QuestionE);
        radioPlacement.add(QuestionF);
        radioPlacement.add(QuestionG);
        radioPlacement.setLayout(new FlowLayout(FlowLayout.LEFT,10,30));
        radioPlacement.setBackground(new Color(255,255,255,25));
        radioPlacement.setOpaque(true);

        group.add(QuestionD);
        group.add(QuestionE);
        group.add(QuestionF);
        group.add(QuestionG);

        textPlacement.setBounds(20,176,200,300);
        textPlacement.add(new Label("List of All Ordered Cakes"));
        textPlacement.add(new Label("Delivery and PickUp Orders"));
        textPlacement.add(new Label("Total & Highest Order of Cakes"));
        textPlacement.add(new Label("Print Customer Receipt"));
        textPlacement.setLayout(new FlowLayout(FlowLayout.LEFT,10,30));
        textPlacement.setBackground(new Color(255,255,255,25));
        textPlacement.setOpaque(true);

        buttonPlacement.add(chooseButton);
        buttonPlacement.add(cancelButton);
        buttonPlacement.setBounds(145,420,50,200);
        cancelButton.addActionListener(this::CancelPerformed);
        chooseButton.addActionListener(this::FinishPerformed);

        frame.add(textPlacement);
        frame.add(maintitlePlacement);
        frame.add(radioPlacement);
        frame.add(buttonPlacement,BorderLayout.PAGE_END);
        frame.add(backgroundPlacement);

        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(EXIT_ON_CLOSE);
        frame.setSize(400,500);
        frame.setTitle("Secret Recipe Interactive GUI");
        frame.setResizable(false);
    }

    public void setStringValue(String display,String questionType){
        if(questionType.equalsIgnoreCase("D")){
            questionD = display;
        } else if(questionType.equalsIgnoreCase("E")){
            questionE = display;
        } else if(questionType.equalsIgnoreCase("F")){
            questionF = display;
        } else if(questionType.equalsIgnoreCase("G")){
            questionG = display;
        }
    }

    public String stringValueD(){return questionD;}
    public String stringValueE(){return questionE;}
    public String stringValueF(){return questionF;}
    public String stringValueG(){return questionG;}

    public void FinishPerformed(ActionEvent e) {
        if(e.getSource() == chooseButton){
            frame.setVisible(false);

            if(QuestionD.isSelected()){
                BufferedImage backgroundMiniWindow = null;

                try {
                    backgroundMiniWindow = ImageIO.read(new File("Window Background.jpeg"));
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                Image backgroundResult = backgroundMiniWindow.getScaledInstance(685,330,Image.SCALE_SMOOTH);
                ImageIcon back = new ImageIcon(backgroundResult);
                JLabel BackgroundWindow = new JLabel();
                JFrame ResultD = new JFrame();
                JButton backButton = new JButton("Return");
                JPanel backPlacement = new JPanel();
                JPanel outputPlacement = new JPanel();
                JLabel output;
                LayoutManager overlay = new OverlayLayout(outputPlacement);

                backPlacement.add(backButton);
                backPlacement.setBounds(145,420,50,200);

                backButton.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        if(e.getSource() == backButton){
                            frame.setVisible(true);
                            ResultD.setVisible(false);
                        }
                    }
                });

                output = new JLabel(stringValueD(),SwingConstants.CENTER);
                outputPlacement.add(output);

                BackgroundWindow.setIcon(back);
                BackgroundWindow.setAlignmentY(0.5f);
                outputPlacement.add(BackgroundWindow);
                outputPlacement.setLayout(overlay);
                outputPlacement.setBorder(new LineBorder(Color.BLACK,3));

                ResultD.add(outputPlacement);
                ResultD.add(backPlacement,BorderLayout.PAGE_END);

                ResultD.setLocationRelativeTo(null);
                ResultD.setDefaultCloseOperation(EXIT_ON_CLOSE);
                ResultD.setTitle("List Of All Ordered Cakes");
                ResultD.setVisible(true);
                ResultD.setSize(700,390);
                ResultD.setResizable(false);
            } else if(QuestionE.isSelected()){
                JFrame ResultE = new JFrame();
                BufferedImage backgroundMiniWindow = null;

                try {
                    backgroundMiniWindow = ImageIO.read(new File("Window Background.jpeg"));
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                Image backgroundResult = backgroundMiniWindow.getScaledInstance(690,405,Image.SCALE_SMOOTH);
                ImageIcon back = new ImageIcon(backgroundResult);
                JLabel BackgroundWindow = new JLabel(back);

                JButton backButton = new JButton("Return");
                JPanel backPlacement = new JPanel();

                JPanel outputPlacement = new JPanel();
                JLabel output;
                LayoutManager overlay = new OverlayLayout(outputPlacement);

                backPlacement.add(backButton);
                backPlacement.setBounds(145,420,50,200);

                backButton.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        if(e.getSource() == backButton){
                            frame.setVisible(true);
                            ResultE.setVisible(false);
                        }
                    }
                });

                output = new JLabel(stringValueE(),SwingConstants.CENTER);
                outputPlacement.add(output);
                outputPlacement.add(BackgroundWindow);
                outputPlacement.setLayout(overlay);
                outputPlacement.setBorder(new LineBorder(Color.BLACK,3));
                ResultE.add(outputPlacement);
                ResultE.add(backPlacement,BorderLayout.PAGE_END);

                ResultE.setLocationRelativeTo(null);
                ResultE.setDefaultCloseOperation(EXIT_ON_CLOSE);
                ResultE.setTitle("Delivery and PickUp Orders");
                ResultE.setVisible(true);
                ResultE.setSize(695,471);
                ResultE.setResizable(false);
            } else if(QuestionF.isSelected()){
                JFrame ResultF = new JFrame();
                BufferedImage backgroundMiniWindow = null;

                try {
                    backgroundMiniWindow = ImageIO.read(new File("Window Background.jpeg"));
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                Image backgroundResult = backgroundMiniWindow.getScaledInstance(350,280,Image.SCALE_SMOOTH);
                ImageIcon back = new ImageIcon(backgroundResult);
                JLabel BackgroundWindow = new JLabel(back);

                JButton backButton = new JButton("Return");
                JPanel backPlacement = new JPanel();

                JPanel outputPlacement = new JPanel();
                JLabel output;
                LayoutManager overlay = new OverlayLayout(outputPlacement);

                backPlacement.add(backButton);
                backPlacement.setBounds(145,420,50,200);

                backButton.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        if(e.getSource() == backButton){
                            frame.setVisible(true);
                            ResultF.setVisible(false);
                        }
                    }
                });

                output = new JLabel(stringValueF(),SwingConstants.CENTER);
                outputPlacement.add(output);
                outputPlacement.add(BackgroundWindow);
                outputPlacement.setLayout(overlay);
                outputPlacement.setBorder(new LineBorder(Color.BLACK,3));
                ResultF.add(outputPlacement);
                ResultF.add(backPlacement,BorderLayout.PAGE_END);

                ResultF.setLocationRelativeTo(null);
                ResultF.setDefaultCloseOperation(EXIT_ON_CLOSE);
                ResultF.setTitle("Total & Highest Order of Cakes");
                ResultF.setVisible(true);
                ResultF.setSize(365,360);
                ResultF.setResizable(false);
            } else if(QuestionG.isSelected()){
                JFrame ResultG = new JFrame();
                BufferedImage backgroundMiniWindow = null;

                try {
                    backgroundMiniWindow = ImageIO.read(new File("ExtendedBackground.png"));
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                Image backgroundResult = backgroundMiniWindow.getScaledInstance(350,1950,Image.SCALE_REPLICATE);
                ImageIcon back = new ImageIcon(backgroundResult);
                JLabel BackgroundWindow = new JLabel(back);

                JButton backButton = new JButton("Return");
                JPanel backPlacement = new JPanel();

                JPanel outputPlacement = new JPanel();
                JLabel output;
                LayoutManager overlay = new OverlayLayout(outputPlacement);

                backPlacement.add(backButton);
                backPlacement.setBounds(145,420,50,200);


                backButton.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        if(e.getSource() == backButton){
                            frame.setVisible(true);
                            ResultG.setVisible(false);
                        }
                    }
                });

                output = new JLabel(stringValueG());
                outputPlacement.add(output);
                outputPlacement.add(BackgroundWindow);
                outputPlacement.setLayout(overlay);
                outputPlacement.setBorder(new LineBorder(Color.BLACK,3));
                ResultG.add(outputPlacement);
                ResultG.add(backPlacement,BorderLayout.PAGE_END);

                JScrollPane scroll = new JScrollPane(outputPlacement,ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                        ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
                ResultG.add(scroll);


                ResultG.setDefaultCloseOperation(EXIT_ON_CLOSE);
                ResultG.setTitle("Print Customer Receipts");
                ResultG.setVisible(true);
                ResultG.setSize(300,1087);
                ResultG.setResizable(false);
            }
        }
    }

    public void CancelPerformed(ActionEvent e){
        if(e.getSource() == cancelButton){
            System.exit(0);
        }
    }
}